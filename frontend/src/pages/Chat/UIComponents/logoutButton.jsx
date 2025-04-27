import React from 'react';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <div className="sign">
          <LogOut className="logout-icon" />
        </div>
        <div className="text">Logout</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    // --ch-black: #141414;
    // --eer-black: #1b1b1b;
    // --night-rider: #2e2e2e;
    // --white: #ffffff;
    // --af-white: #f3f3f3;
    // --ch-white: #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 32px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);

    color: var(--af-white); /* Default text color for both icon and text */
  }

  /* LogOut Icon (Button Sign) */
  .sign {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .logout-icon {
    width: 20px;
    height: 20px;
    color: inherit; /* Inherit the text color, so the icon color changes dynamically */
  }

  /* Text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: inherit; /* Make the text color inherit the color of the parent */
    font-size: 1em;
    font-weight: 500;
    transition-duration: 0.3s;
    transition-timing-function: ease; /* Smooth transition */
  }

  /* Hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 5px;
  }

  .Btn:hover .sign {
    width: 30%;
    padding-left: 20px;
  }

  /* Hover effect on the text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    padding-right: 10px;
  }

  /* Button click effect */
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

export default Button;
