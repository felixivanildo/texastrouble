import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  Pendente: 'warning',
  delivered: 'success',
  refunded: 'error'
};


export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Meus Laudos" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <p style={{fontWeight: "bolder"}}>NOME DO LAUDO</p>
                </TableCell>
                <TableCell>
                <p style={{fontWeight: "bolder"}}>SETOR ATUAL</p>
                </TableCell>
                <TableCell sortDirection="desc">
                <p style={{fontWeight: "bolder"}}>ULTIMA ATUALIZACAO</p>
                </TableCell>
                <TableCell>
                <p style={{fontWeight: "bolder"}}>STATUS</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = String(order.createdAt).substring(0,10);

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
