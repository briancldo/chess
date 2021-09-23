import { newIncognitoPage, test, expect } from '../__utils__/playwright.utils';
import { login } from '../__utils__/auth.utils';
import { sendAndAcceptChallenge } from '../__utils__/challenge.utils';
import { localStorageGet } from '../__utils__/browser/localStorage.utils';
import { Page } from '@playwright/test';

test.describe('match#', () => {
  let incognitoPage: Page, usernameWhite: string;

  test.beforeEach(async ({ page, browser }) => {
    await page.goto('/');
    incognitoPage = await newIncognitoPage(browser, '/');
    await login(page, { username: 'magnus' });
    await login(incognitoPage, { username: 'nepo' });
    await sendAndAcceptChallenge('magnus', incognitoPage, page);

    const matchData = (await localStorageGet(page, 'chessapp-match')).state;
    const { white } = matchData.gameDetails.sides;
    usernameWhite = white;
  });

  test('player names are next to their side', async ({ page }) => {
    const magnusUsernameY = {
      magnus: await getYUsername(page, 'magnus'),
      nepo: await getYUsername(page, 'nepo'),
    };
    const nepoUsernameY = {
      magnus: await getYUsername(incognitoPage, 'magnus'),
      nepo: await getYUsername(incognitoPage, 'nepo'),
    };

    expect(magnusUsernameY.magnus).toBeGreaterThan(magnusUsernameY.nepo);
    expect(nepoUsernameY.nepo).toBeGreaterThan(nepoUsernameY.magnus);
  });

  test('board direction is according to player side', async ({ page }) => {
    const magnusPawnY = {
      white: await getYCoordinatePiece(page, 'e2'),
      black: await getYCoordinatePiece(page, 'e7'),
    };
    const nepoPawnY = {
      white: await getYCoordinatePiece(incognitoPage, 'e2'),
      black: await getYCoordinatePiece(incognitoPage, 'e7'),
    };
    /* eslint-disable jest/no-conditional-expect */
    if (usernameWhite === 'magnus') {
      expect(magnusPawnY.white).toBeGreaterThan(magnusPawnY.black);
      expect(nepoPawnY.black).toBeGreaterThan(nepoPawnY.white);
    } else {
      expect(magnusPawnY.black).toBeGreaterThan(magnusPawnY.white);
      expect(nepoPawnY.white).toBeGreaterThan(nepoPawnY.black);
    }
    /* eslint-enable jest/no-conditional-expect */
  });
});

type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type BoardFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
type BoardCoordinate = `${BoardFile}${BoardRank}`;
async function getYCoordinatePiece(
  page: Page,
  boardCoordinate: BoardCoordinate
) {
  const element = await page.$(`data-testid=${boardCoordinate}`);
  // type: we can guarantee that the element exists
  return (await element?.boundingBox())?.y as number;
}

async function getYUsername(page: Page, username: string) {
  const element = await page.$(`data-testid=match-username-${username}`);
  // type: we can guarantee that the element exists
  return (await element?.boundingBox())?.y as number;
}
