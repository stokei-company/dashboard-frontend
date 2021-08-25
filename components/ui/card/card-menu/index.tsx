import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { MenuEllipsisIcon } from "~/components/icons";

export interface CardMenuItemData {
  readonly text: string;
  readonly color?: string;
  readonly loading?: boolean;
  readonly loadingText?: string;
  readonly onClick: () => void;
}

export interface CardMenuProps {
  readonly items: CardMenuItemData[];
}

export const CardMenu: React.FC<CardMenuProps> = ({ items, children }) => {
  return (
    <Menu>
      <MenuButton
        position="absolute"
        right="2"
        top="2"
        as={IconButton}
        icon={<MenuEllipsisIcon />}
        variant="ghost"
        color="gray.700"
      />
      <MenuList>
        {items?.map((item, index) => (
          <MenuItem key={index} color={item?.color} onClick={item?.onClick}>
            {item.loading ? item.loadingText : item.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
