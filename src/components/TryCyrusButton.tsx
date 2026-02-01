import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function TryCyrusButton() {
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <button
        className="button"
        data-text="Join"
        onClick={() => navigate("/signin")}
      >
        <span className="actual-text">&nbsp;Join&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;Join&nbsp;
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;

    --border-right: 6px;
    --text-stroke-color: rgba(255, 255, 255, 0.6);
    --animation-color: #ffffff;
    --fs-size: 2em;

    letter-spacing: 3px;
    font-size: var(--fs-size);
    font-family: Arial, sans-serif;
    position: relative;
    text-transform: uppercase;

    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }

  .hover-text {
    position: absolute;
    inset: 0;
    width: 0%;
    overflow: hidden;

    color: var(--animation-color);
    border-right: var(--border-right) solid var(--animation-color);
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }

  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color));
  }
`;

export default TryCyrusButton;
