import styled, { keyframes, css } from 'styled-components';
import { slideInLeft, slideInRight, bounceInDown, rotateInDownLeft, slideInUp, bounceInUp } from 'react-animations';
import MDBox from '../items/MDBox/MDBox';

const animations = {
  bounceInDown: keyframes`${bounceInDown}`,
  slideInLeft: keyframes`${slideInLeft}`,
  slideInRight: keyframes`${slideInRight}`,
  rotateInDownLeft: keyframes`${rotateInDownLeft}`,
  bounceInUp: keyframes`${bounceInUp}`,
  slideInUp: keyframes`${slideInUp}`,
};

const getAnimation = (animationType) => css`
  animation: 1s ${animations[animationType]};
`;

const AnimatedCard = styled(({ animationType, ...rest }) => <MDBox {...rest} />)`
  ${({ animationType }) => getAnimation(animationType)}
`;

export default AnimatedCard;
