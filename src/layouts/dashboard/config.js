import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ultimas Alterações',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Criar laudo',
    path: '/formulario_laboratorio',
    icon: (
      <SvgIcon fontSize="small">
        <PostAddIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'Contatos e Redes',
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Usuario',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Configurações',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Registrar Usuario',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize="small">
        <XCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Listar Usuarios',
    path: '/listarusuario',
    icon: (
      <SvgIcon fontSize="small">
        <FormatListBulletedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cadastrar Unidade',
    path: '/cadastraunidade',
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cadastrar Cidade',
    path: '/cadastrarcidades',
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cadastrar Prédio',
    path: '/cadastrarpredio',
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    )
  },
  {
    title: 'xyp9x',
    path: '/laiouteste',
    icon: (
      <SvgIcon fontSize="small">
        <AddIcon />
      </SvgIcon>
    )
  },

];
