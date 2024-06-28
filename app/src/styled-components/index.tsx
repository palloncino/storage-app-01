import styled from "styled-components";
import { PALETTE } from "../constants/index.ts";

export const WhitePaperContainer = styled.div<{ padding?: string }>`
  background: ${PALETTE.White};
  border-radius: 0.5rem;
  padding-bottom: 2rem;
  padding: ${({ padding }) => (padding ? padding : "")};
`;