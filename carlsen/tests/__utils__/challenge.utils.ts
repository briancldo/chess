import { Page } from '@playwright/test';

function validatePages(challengerPage: Page, challengeePage: Page) {
  if (challengerPage === challengeePage)
    throw new Error('challengerPage === challengeePage');
}

export async function sendAndAcceptChallenge(
  toUser: string,
  challengerPage: Page,
  challengeePage: Page
) {
  validatePages(challengerPage, challengeePage);

  await new Promise<void>((resolve) => {
    challengerPage.once('dialog', async (dialog) => {
      await dialog.accept(toUser);
    });
    challengeePage.once('dialog', async (dialog) => {
      await dialog.accept();
      resolve();
    });

    challengerPage.click('text=Challenge');
  });
}

export async function sendAndRejectChallenge(
  toUser: string,
  challengerPage: Page,
  challengeePage: Page
) {
  validatePages(challengerPage, challengeePage);

  return new Promise<string>((resolve) => {
    challengerPage.once('dialog', async (dialog) => {
      await dialog.accept(toUser);

      challengerPage.once('dialog', async (dialog) => {
        resolve(dialog.message());
      });
    });
    challengeePage.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    challengerPage.click('text=Challenge');
  });
}

export async function sendChallengeWithError(
  toUser: string,
  challengerPage: Page
) {
  return await sendAndRejectChallenge(toUser, challengerPage, {
    once: () => undefined,
  } as unknown as Page);
}
