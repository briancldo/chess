import React, { CSSProperties } from 'react';

interface CornerSpecs {
  TopLeft: boolean;
  TopRight: boolean;
  BottomLeft: boolean;
  BottomRight: boolean;
}
type Corner = `border${keyof CornerSpecs}Radius`;

type RoundedSquareProps = Partial<CornerSpecs> & { color: string };

const cornerRadius = '1.3vw';

const RoundedSquare: React.FC<RoundedSquareProps> = (props) => {
  const { color } = props;
  const cornerStyles = getCornerRadiusStyles(props);

  const cornerSquareStyle: CSSProperties = {
    height: '5vw',
    width: '5vw',
    backgroundColor: color,
    position: 'absolute',
    ...cornerStyles,
  };
  return <div style={cornerSquareStyle} />;
};

export default RoundedSquare;

function getCornerRadiusStyles(corners: Partial<CornerSpecs>) {
  const style: CSSProperties = {};

  for (const corner in corners) {
    const cornerProperty = `border${corner}Radius` as Corner;
    style[cornerProperty] = cornerRadius;
  }

  return style;
}
