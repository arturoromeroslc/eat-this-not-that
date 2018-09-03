import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'react-emotion'

import breakpoints from '../utils/breakpoints'

const StyledUl = styled('ul')`
  diplay: flex;
  flex-wrap: wrap;
`

const StyledLi = styled('li')`
  margin: 10px;
  display: inline-block;

  ${breakpoints.tablet} {
    width: 46%;
  }

  ${breakpoints.desktop} {
    width: 30%;
  }
`

const Placeholder = () => (
  <StyledUl>
    <StyledLi style={{ backgroundColor: 'white', margin: '10px' }}>
      <ContentLoader
        height={475}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <circle cx="625" cy="-50" r="30" />
        <rect
          x="51.53"
          y="24"
          rx="4"
          ry="4"
          width="297"
          height="31.590000000000003"
        />
        <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
        <rect x="30" y="76.05" rx="5" ry="5" width="344" height="308" />
        <rect x="165" y="412.05" rx="0" ry="0" width="0" height="0" />
        <rect x="50" y="397.05" rx="0" ry="0" width="301.99" height="16" />
        <rect x="70" y="422.05" rx="0" ry="0" width="258" height="16" />
        <rect x="92" y="448.05" rx="0" ry="0" width="216.69" height="15" />
      </ContentLoader>
    </StyledLi>
    <StyledLi style={{ backgroundColor: 'white' }}>
      <ContentLoader
        height={475}
        width={400}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <circle cx="625" cy="-50" r="30" />
        <rect
          x="51.53"
          y="24"
          rx="4"
          ry="4"
          width="297"
          height="31.590000000000003"
        />
        <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
        <rect x="30" y="76.05" rx="5" ry="5" width="344" height="308" />
        <rect x="165" y="412.05" rx="0" ry="0" width="0" height="0" />
        <rect x="50" y="397.05" rx="0" ry="0" width="301.99" height="16" />
        <rect x="70" y="422.05" rx="0" ry="0" width="258" height="16" />
        <rect x="92" y="448.05" rx="0" ry="0" width="216.69" height="15" />
      </ContentLoader>
    </StyledLi>
  </StyledUl>
)

export default Placeholder
