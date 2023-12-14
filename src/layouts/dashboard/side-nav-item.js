import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, ButtonBase } from '@mui/material';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;
  const [togglevisible, settogglevisible] = useState(false)

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  const handlechange = async () => {
    settogglevisible(!togglevisible)
  }


  return (
    <li>
      {/* {console.log(props)}       */}

      {title === 'Adm' &&
        <ButtonBase onClick={() => { handlechange() }}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        // {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}


          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            {title}
          </Box>


        </ButtonBase>



      }
      






      {/*  */}



{title === 'Operacional' &&
        <ButtonBase onClick={() => { handlechange() }}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        // {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}


          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            {title}
          </Box>


        </ButtonBase>



      }



{title === 'Cadastrar' &&
        <ButtonBase onClick={() => { handlechange() }}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        // {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}


          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            {title}
          </Box>


        </ButtonBase>



      }


     


    {title !== 'Registrar Usuário' && title !== "Operacional" && title !== 'Cadastrar' && title !== 'Adm' &&
       <ButtonBase onClick={() => { handlechange() }}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}


          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            {title}
          </Box>


        </ButtonBase>



      }



      {title === 'Adm' && togglevisible &&
        <div className='expandable' style={{ marginLeft: "15%" }}>
          <Button href='/'>Overview</Button>
          <br></br>
          <Button href='/customers'>Ultimas Alterações</Button>
          <Button href='/listarusuario'>Listar Usuário</Button>
        </div>

      }

      {title === 'Operacional' && togglevisible &&
        <div className='expandable' style={{ marginLeft: "15%" }}>
          <Button href='/formulario_laboratorio?dynamicProp=agua_tratada'>Água Tratada</Button>
          <br></br>
          <Button href='/formulario_laboratorio?dynamicProp=agua_bruta' >Água Bruta</Button>
        </div>

      }


      {title === 'Cadastrar' && togglevisible &&
        <div className='expandable' style={{ marginLeft: "15%" }}>
          <Button href='/cadastrarcidades'>Cadastrar Cidade</Button>
          <br></br>
          <Button href='/cadastrarpredio'>Cadastrar Prédio</Button>
          <br/>
          <Button href='/cadastrarunidade'>Cadastrar Unidade Organizacional</Button>
          <br/>
          <Button href='/cadastrarsetor'>Cadastrar Setor</Button>
          <br/>
          <Button href='/cadastrarinterecado'>Cadastrar Intereçado</Button>
          <br/>
          <Button href='/cadastrarunidade'>Cadastrar Tipo de Coleta</Button>
        </div>

      }



    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
