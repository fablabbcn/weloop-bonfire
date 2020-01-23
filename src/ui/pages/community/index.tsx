import * as React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass/styled-components';
import media from 'styled-media-query';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from 'ui/elements/Panel';
import styled from 'ui/themes/styled';

// interface Collection {
//   id: any;
// }
// type CollectionBox = React.ComponentType<{ collection: Collection }>;

// interface Activity {
//   id: any;
// }
// type ActivityBox = React.ComponentType<{ activity: Activity }>;

export interface Props {
  ActivityBoxes: JSX.Element[];
  CollectionBoxes: JSX.Element[];
  HeroCommunityBox: JSX.Element;
  currentPath: string;
}

export const Community: React.FC<Props> = ({
  ActivityBoxes,
  HeroCommunityBox,
  CollectionBoxes,
  currentPath
}) => {
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <Wrapper>
            {HeroCommunityBox}
            <Menu currentPath={currentPath} />
            <Switch>
              <Route exact path={`${currentPath}`}>
                {ActivityBoxes}
              </Route>
              <Route path={`${currentPath}/collections`}>
                {CollectionBoxes}
              </Route>
              <Route path={`${currentPath}/threads`}>
                <div>threads</div>
              </Route>
            </Switch>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular hashtags
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              #pedagogy
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #transition
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #english
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #template
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              #assessment
            </NavItem>
          </Nav>
        </Panel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            Popular categories
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              Humanities
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Behavioural science
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              English
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Romana
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              Postgraduate
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

// export interface RecentActivitiesProps {
//   activities: Activity[];
//   ActivityBox: ActivityBox;
// }
// const RecentActivities: React.SFC<RecentActivitiesProps> = ({
//   activities,
//   ActivityBox
// }) => {
//   return (
//     <>
//       {activities.map(activity => (
//         <ActivityBox activity={activity} key={activity.id} />
//       ))}
//     </>
//   );
// };

// export interface CollectionsProps {
//   collections: Collection[];
//   CollectionBox: CollectionBox;
// }
// const Collections: React.SFC<CollectionsProps> = ({
//   collections,
//   CollectionBox
// }) => {
//   return (
//     <>
//       {collections.map(collection => (
//         <CollectionBox collection={collection} key={collection.id} />
//       ))}
//     </>
//   );
// };

const Menu = ({ currentPath }: { currentPath: string }) => (
  <MenuWrapper p={3} pt={0}>
    <NavLink exact to={`${currentPath}`}>
      Recent activities
    </NavLink>
    <NavLink to={`${currentPath}/collections`}>Collections</NavLink>
    <NavLink to={`${currentPath}/threads`}>Threads</NavLink>
  </MenuWrapper>
);

const MenuWrapper = styled(Flex)`
  a {
    font-weight: 800;
    text-decoration: none;
    margin-right: 24px;
    color: ${props => props.theme.colors.gray};
    letterspacing: '1px';
    font-size: 16px;
    &.active {
      color: ${props => props.theme.colors.orange};
      position: relative;
      &:after {
        position: absolute;
        content: '';
        display: block;
        top: -15px;
        width: 100%;
        height: 3px;
        background: ${props => props.theme.colors.orange};
      }
    }
  }
`;
export const HomeBox = styled(Flex)`
  max-width: 600px;
  width: 100%;
  align-items: flex-start;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: auto;
  flex-direction: column;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
  ${media.lessThan('1005px')`
  max-width: 100%;
  `};
  // ${media.lessThan('1280px')`
  // top: 60px;
  // `};
`;

export const MainContainer = styled(Flex)`
  align-items: stretch;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: row;
  width: 100%;
`;

export const WrapperCont = styled(Flex)`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  background: white;
  border-radius: 4px;
  z-index: 0;
`;

export const Wrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  flex: 1;
  & ul {
    display: block;

    & li {
      display: inline-block;

      & h5 {
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
  & h4 {
    margin: 0;
    font-weight: 400 !important;
    font-size: 14px !important;
    color: #151b26;
    line-height: 40px;
  }
`;

export default Community;
