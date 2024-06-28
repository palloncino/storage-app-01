import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageHeader from "../components/PageHeader/index.tsx";
import { PALETTE, ROUTES } from "../constants/index.ts";
import { useAppState } from "../state/stateContext";
import { WhitePaperContainer } from "../styled-components/index.tsx";

const StyledCard = styled(Card) <{ $disabled?: boolean }>`
  transition: all 0.3s ease-in-out;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  background: ${PALETTE.Blue};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: ${(props) => (props.$disabled ? "none" : "scale(1.05)")};
    box-shadow: ${(props) => (props.$disabled ? "none" : "0 15px 25px rgba(0, 0, 0, 0.15)")};
  }
`;

const CardIconContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledCardContent = styled(CardContent)`
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CardTitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonRow = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;

const StyledCardGridItem = styled(Grid)`
  flex: 1; 
  min-width: calc(100% / 5 - 1rem); 
  max-width: calc(100% / 5 - 1rem); 
  box-sizing: border-box; 
`;

const PageHeaderContainer = styled(Box)`
  height: 174px;
  overflow: hidden;
`;

interface HomepageItem {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  disabled?: boolean;
}

const Homepage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppState();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<HomepageItem | null>(null);

  const handleNavigation = (path: string, disabled?: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  const items: HomepageItem[] = [
    {
      icon: GroupIcon,
      title: t("HomepageUsersCardTitle"),
      description: t("HomepageUsersCardDesc"),
      path: ROUTES().usersList,
      disabled: !Boolean(user),
    },
    {
      icon: ShoppingCartIcon,
      title: t("HomepageProductCardTitle"),
      description: t("HomepageProductCardDesc"),
      path: ROUTES().productList,
      disabled: !Boolean(user),
    },
    {
      icon: PersonIcon,
      title: t("HomepageClientsCardTitle"),
      description: t("HomepageClientsCardDesc"),
      path: ROUTES().clientsList,
      disabled: !Boolean(user),
    },
  ];

  return (
    <WhitePaperContainer>
      <Container maxWidth="lg">
        <PageHeaderContainer>
          <PageHeader 
            title={t('HomepageHeadTitle')} 
            description={hoveredItem ? hoveredItem.description : t('HomepageHeadDescription')} 
            margin={'0'} 
          />
        </PageHeaderContainer>
        <ButtonRow container spacing={0}>
          {items.map((item, index) => (
            <StyledCardGridItem 
              item 
              xs={12} 
              md={2} 
              key={index}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <StyledCard
                $disabled={item.disabled}
                onClick={() => handleNavigation(item.path, item.disabled)}
              >
                <StyledCardContent>
                  <CardIconContainer>
                    <item.icon style={{ fontSize: 30 }} />
                  </CardIconContainer>
                  <CardTitle variant="h6">{item.title}</CardTitle>
                </StyledCardContent>
              </StyledCard>
            </StyledCardGridItem>
          ))}
        </ButtonRow>
      </Container>
    </WhitePaperContainer>
  );
};

export default Homepage;
