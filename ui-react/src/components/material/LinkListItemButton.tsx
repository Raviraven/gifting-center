import { ListItemButton } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { Link, To, useLocation, useResolvedPath } from 'react-router-dom';

interface LinkListItemButtonProps {
  children: ReactNode;
  to: To;
  exact?: boolean;
}

export const LinkListItemButton: React.FC<LinkListItemButtonProps> = (
  props: LinkListItemButtonProps
) => {
  const location = useLocation();
  const path = useResolvedPath(props.to); // ?

  const selected = useMemo(() => {
    return props.exact
      ? location.pathname === path.pathname
      : location.pathname.startsWith(path.pathname);
  }, [location.pathname, path.pathname, props.exact]);

  return (
    <ListItemButton selected={selected} component={Link} to={props.to}>
      {props.children}
    </ListItemButton>
  );
};
