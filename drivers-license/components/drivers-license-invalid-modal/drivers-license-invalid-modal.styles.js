import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 60px 32px 0;
`;

export const TextWrapper = styled.div`
  flex-basis: 100%;
  max-width: 460px;
`;

export const HeadingWrapper = styled.div`
  text-align: center;
`;

export const Heading = styled.h3`
  color: ${props => props.theme.carvana.blue.dark};
  font-size: 18px;
  text-transform: uppercase;
`;

export const Subheading = styled.p`
  color: ${props => props.theme.carvana.gray.dark};
  font-size: 14px;
  margin-top: 8px;
`;

export const List = styled.ul`
  color: ${props => props.theme.carvana.gray.dark};
  list-style-type: none;
  padding-left: 28px;
  padding-top: 40px;
`;

export const ListItem = styled.li`
  line-height: 1.5;
  position: relative;

  &::before {
    color: ${props => props.theme.carvana.blue.medium};
    content: '•';
    font-size: 22px;
    left: -16px;
    position: absolute;
    top: -6px;
  }

  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 80px;
`;