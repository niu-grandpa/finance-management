import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

const pieData = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month,
            运营支出: operationalExpenses,
            非运营支出: nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea='d'>
        <BoxHeader title='运营与非运营费用' sideText='+4%' />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='非运营支出'
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='运营支出'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='e'>
        <BoxHeader title='活动和目标' sideText='+4%' />
        <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}>
            <Pie
              stroke='none'
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey='value'>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
            <Typography variant='h5'>目标销售额</Typography>
            <Typography m='0.3rem 0' variant='h3' color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant='h6'>预期资金流水目标</Typography>
          </Box>
          <Box flexBasis='40%'>
            <Typography variant='h5'>收入损失</Typography>
            <Typography variant='h6'>损失下降 25%</Typography>
            <Typography mt='0.4rem' variant='h5'>
              利润率
            </Typography>
            <Typography variant='h6'>利润率同比上月增加 30%。</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='f'>
        <BoxHeader title='产品价格与费用' sideText='+4%' />
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}>
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type='number'
              dataKey='price'
              name='价格'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={v => `$${v}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='费用'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={v => `$${v}`}
            />
            <ZAxis type='number' range={[20]} />
            <Tooltip formatter={v => `$${v}`} />
            <Scatter
              name='产品费用比例'
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
