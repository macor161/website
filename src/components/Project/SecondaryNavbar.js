import React from 'react'
import styled from 'styled-components'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { breakpoint, SafeLink, BreakPoint, DropDown } from '@aragon/ui'
import { Link } from 'react-static'
import { Redirect } from 'react-router'
import governance from './assets/secondary-navbar/governance.svg'
import governanceActive from './assets/secondary-navbar/governanceActive.svg'
import grants from './assets/secondary-navbar/grants.svg'
import grantsActive from './assets/secondary-navbar/grantsActive.svg'
import roadmap from './assets/secondary-navbar/roadmap.svg'
import roadmapActive from './assets/secondary-navbar/roadmapActive.svg'
import contribute from './assets/secondary-navbar/contribute.svg'
import contributeActive from './assets/secondary-navbar/contributeActive.svg'
import blog from './assets/secondary-navbar/blog.svg'
import events from './assets/secondary-navbar/events.svg'
import wiki from './assets/secondary-navbar/wiki.svg'

const medium = css => breakpoint('medium', css)

const dropdownItems = [
  <span className="dropdown-span">Explore...</span>,
  <a href="http://www.google.com">
    <span className="dropdown-span">
      <div>
        <img src={governance} />
      </div>
      <FormattedMessage
        id="project.secondary-navbar.mobile.item1"
        defaultMessage="Governance"
      />
    </span>
  </a>,
  <span className="dropdown-span">
    <div>
      <img src={grants} />
    </div>
    <FormattedMessage
      id="project.secondary-navbar.mobile.item2"
      defaultMessage="Grants"
    />
  </span>,
  <span className="dropdown-span">
    <div>
      <img src={contribute} />
    </div>
    <FormattedMessage
      id="project.secondary-navbar.mobile.item3"
      defaultMessage="Contribute"
    />
  </span>,
  <span className="dropdown-span">
    <div>
      <img src={blog} />
    </div>
    <FormattedMessage
      id="project.secondary-navbar.mobile.item4"
      defaultMessage="Blog"
    />
  </span>,
  <span className="dropdown-span">
    <div>
      <img src={events} />
    </div>
    <FormattedMessage
      id="project.secondary-navbar.mobile.item6"
      defaultMessage="Events"
    />
  </span>,
]
const dropdownNames = [
  'explore',
  'governance',
  'grants',
  'contribute',
  'blog',
  'events',
]
const dropdownLinks = [
  '/project',
  '/project/governance',
  '/project/grants',
  '/project/contribute',
  'https://blog.aragon.org',
  'https://aracon.one',
]

class SecondaryNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = { activeItem: dropdownNames.indexOf(this.props.page) }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(index) {
    if (index != 0) {
      this.setState({ activeItem: index })
    }
  }
  render() {
    if (this.state.activeItem != dropdownNames.indexOf(this.props.page)) {
      if (
        dropdownLinks[this.state.activeItem].includes('https://') ||
        dropdownLinks[this.state.activeItem].includes('http://')
      ) {
        window.location.href = dropdownLinks[this.state.activeItem]
      } else {
        return <Redirect to={dropdownLinks[this.state.activeItem]} />
      }
    }
    return (
      <div>
        <BreakPoint from="medium">
          <Navbar>
            <Container>
              <InternalItem
                className={
                  this.props.page &&
                  this.props.page === 'governance' &&
                  'governance active'
                }
                to={
                  this.props.intl.locale
                    ? '/' + this.props.intl.locale + '/project/governance'
                    : '/project/governance'
                }
              >
                {this.props.page === 'governance' ? (
                  <img src={governanceActive} />
                ) : (
                  <img src={governance} />
                )}
                <h6>
                  <FormattedMessage
                    id="project.secondary-navbar.item1"
                    defaultMessage="Governance"
                  />
                </h6>
              </InternalItem>
              <InternalItem
                className={
                  this.props.page &&
                  this.props.page === 'grants' &&
                  'grants active'
                }
                to={
                  this.props.intl.locale
                    ? '/' + this.props.intl.locale + '/project/grants'
                    : '/project/grants'
                }
              >
                {this.props.page === 'grants' ? (
                  <img src={grantsActive} />
                ) : (
                  <img src={grants} />
                )}
                <h6>
                  <FormattedMessage
                    id="project.secondary-navbar.item2"
                    defaultMessage="Grants"
                  />
                </h6>
              </InternalItem>
              <InternalItem
                className={
                  this.props.page &&
                  this.props.page === 'contribute' &&
                  'contribute active'
                }
                to={
                  this.props.intl.locale
                    ? '/' + this.props.intl.locale + '/project/contribute'
                    : '/project/contribute'
                }
              >
                {this.props.page === 'contribute' ? (
                  <img src={contributeActive} />
                ) : (
                  <img src={contribute} />
                )}
                <h6>
                  <FormattedMessage
                    id="project.secondary-navbar.item3"
                    defaultMessage="Contribute"
                  />
                </h6>
              </InternalItem>
              <Item href="https://blog.aragon.org/">
                <img src={blog} />
                <h6>
                  <FormattedMessage
                    id="project.secondary-navbar.item4"
                    defaultMessage="Blog"
                  />
                </h6>
              </Item>
              <Item href="https://aracon.one/" target="_blank">
                <img src={events} />
                <h6>
                  <FormattedMessage
                    id="project.secondary-navbar.item6"
                    defaultMessage="Events"
                  />
                </h6>
              </Item>
            </Container>
          </Navbar>
        </BreakPoint>
        <BreakPoint to="medium">
          <DropDownContainer>
            <DropDown
              wide
              items={dropdownItems}
              active={this.state.activeItem}
              className="secondary-dropdown"
              onChange={this.handleChange}
            />
          </DropDownContainer>
        </BreakPoint>
      </div>
    )
  }
}

const DropDownContainer = styled.div`
  text-align: center;
  padding: 30px;
  background: white;
  img {
    height: 24px;
    padding-right: 12px;
  }
  span {
    display: flex;
    align-items: center;
    font-family: 'FontRegular';
  }
  span.dropdown-span:hover,
  span.dropdown-span:focus {
    color: #4a80e4;
  }
  span.dropdown-span div {
    width: 40px;
    text-align: left;
  }
`

const Navbar = styled.nav`
  height: 131px;
  ${medium('height: 171px;')};
  background-color: white;
  padding-top: 32px;
`
const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1050px;
  margin: auto;
  color: white;
  height: 67px;
  ${medium('height: 107px;')};
  a {
    position: relative;
    display: flex;
    height: 142px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    ${medium('padding: 0 30px')};
  }

  h6 {
    display: none;
    ${medium('display: block')};
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #1c242d;
    margin-top: 15px;
  }
  .active h6 {
    color: white;
  }
  .governance.active {
    background: linear-gradient(133.69deg, #65aaff -43.9%, #5d21d4 105.39%);
  }
  .grants.active {
    background: linear-gradient(324.1deg, #fff886 -112.1%, #ff4e78 91.91%);
  }
  .contribute.active {
    background: linear-gradient(135.14deg, #ff9372 8.69%, #ffd770 103.74%);
  }
  .roadmap.active {
    background: linear-gradient(134.26deg, #658499 -12.72%, #9fc5c8 96.2%);
  }
`
const Item = styled(SafeLink)`
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;

  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.0726053);
  border-radius: 12px;
  width: 125px;
  transition: all 0.25s ease-in-out;
  &:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.17);
  }
`
const InternalItem = styled(Link)`
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;

  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.0726053);
  border-radius: 12px;
  width: 125px;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.17);
  }
`

const propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(SecondaryNavbar)
