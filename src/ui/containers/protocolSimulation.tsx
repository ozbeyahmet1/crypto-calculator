'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../components/lib/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/lib/form';
import { Input } from '../components/lib/input';

const FormSchema = z.object({
  avaxPrice: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: 'required field',
      invalid_type_error: 'Avax Price must be a number',
    }),
  ),
  depositedAvax: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Amount of AVAX Deposited into the Protocol must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  totalValOfAvax: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Total Value of AVAX Collateral of the Protocol must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  aUSDmarketCap: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: 'required field',
      invalid_type_error: 'Avax Price must be a number',
    }),
  ),
  aUSDinCirculation: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: 'required field',
      invalid_type_error: 'Avax Price must be a number',
    }),
  ),
  aUSDPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  xAVAXMarketCap: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  xAVAXinCirculation: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  xAVAXPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  leverage: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(1, { message: 'Value must be at least 1' }),
  ),
  collateralizationRatio: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0, { message: 'Value must be at least 1' }),
  ),
});

export function ProtocolSimulation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avaxPrice: 30.0,
      depositedAvax: 90000,
      totalValOfAvax: 2700000,
      aUSDmarketCap: 2000000,
      aUSDinCirculation: 2000000,
      aUSDPrice: 1,
      xAVAXMarketCap: 700000,
      xAVAXinCirculation: 575802,
      xAVAXPrice: 1.22,
      leverage: 3.86,
      collateralizationRatio: 135,
    },
  });
  const avaxPrice = useWatch({ control: form.control, name: 'avaxPrice' });
  const depositedAvax = useWatch({ control: form.control, name: 'depositedAvax' });
  const collateralizationRatio = useWatch({ control: form.control, name: 'collateralizationRatio' });
  const aUSDinCirculation = useWatch({ control: form.control, name: 'aUSDinCirculation' });
  const totalValOfAvax = useWatch({ control: form.control, name: 'totalValOfAvax' });
  const aUSDmarketCap = useWatch({ control: form.control, name: 'aUSDmarketCap' });
  const xAVAXMarketCap = useWatch({ control: form.control, name: 'xAVAXMarketCap' });
  const xAVAXinCirculation = useWatch({ control: form.control, name: 'xAVAXinCirculation' });

  useEffect(() => {
    form.setValue('totalValOfAvax', avaxPrice * depositedAvax);
  }, [avaxPrice, depositedAvax, form]);

  useEffect(() => {
    if (collateralizationRatio > 100) {
      form.setValue('aUSDmarketCap', totalValOfAvax);
    } else {
      form.setValue('aUSDmarketCap', aUSDinCirculation);
    }
  }, [collateralizationRatio, totalValOfAvax, aUSDinCirculation, form]);

  useEffect(() => {
    if (totalValOfAvax > aUSDmarketCap) {
      form.setValue('aUSDPrice', 1);
    } else {
      form.setValue('aUSDPrice', totalValOfAvax / aUSDinCirculation);
    }
  }, [totalValOfAvax, aUSDmarketCap, aUSDinCirculation, form]);

  useEffect(() => {
    if (totalValOfAvax - aUSDinCirculation > 0) {
      form.setValue('xAVAXMarketCap', totalValOfAvax - aUSDmarketCap);
    } else {
      form.setValue('xAVAXMarketCap', 0);
    }
  }, [totalValOfAvax, aUSDinCirculation, aUSDmarketCap, form]);

  useEffect(() => {
    if (totalValOfAvax >= aUSDmarketCap) {
      form.setValue('xAVAXPrice', xAVAXMarketCap / xAVAXinCirculation);
    } else {
      form.setValue('xAVAXPrice', 0);
    }
  }, [totalValOfAvax, aUSDmarketCap, xAVAXMarketCap, xAVAXinCirculation, form]);

  useEffect(() => {
    const parsedAUSDMarketCap = parseFloat(aUSDmarketCap.toString());
    const parsedXAVAXMarketCap = parseFloat(xAVAXMarketCap.toString());
    if (parsedXAVAXMarketCap <= 0) {
      form.setValue('leverage', 0);
    } else {
      form.setValue('leverage', (parsedAUSDMarketCap + parsedXAVAXMarketCap) / parsedXAVAXMarketCap);
    }
  }, [xAVAXMarketCap, aUSDmarketCap, form]);

  useEffect(() => {
    form.setValue('collateralizationRatio', totalValOfAvax / aUSDinCirculation);
  }, [totalValOfAvax, aUSDinCirculation, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <section className="mb-20 mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 lg:w-2/3">
          {/* AVAX Price */}
          <FormField
            control={form.control}
            name="avaxPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avax Price($)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avax Price"
                    {...field}
                    type="number"
                    disabled
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Amount of AVAX Deposited into the Protocol */}
          <FormField
            control={form.control}
            name="depositedAvax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of AVAX Deposited into the Protocol</FormLabel>
                <FormControl>
                  <Input placeholder="0 AVAX" min={1} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Total Value of AVAX Collateral of the Protocol */}
          <FormField
            control={form.control}
            name="totalValOfAvax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Value of AVAX Collateral of the Protocol($)</FormLabel>
                <FormControl>
                  <Input placeholder="0$" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* aUSD Market Cap  */}
          <FormField
            control={form.control}
            name="aUSDmarketCap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>aUSD Market Cap($) </FormLabel>
                <FormControl>
                  <Input placeholder="0$" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Amount of aUSD in circulation */}
          <FormField
            control={form.control}
            name="aUSDinCirculation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of aUSD in circulation($)</FormLabel>
                <FormControl>
                  <Input placeholder="0" min={1} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* aUSD Price */}
          <FormField
            control={form.control}
            name="aUSDPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>aUSD Price($) </FormLabel>
                <FormControl>
                  <Input placeholder="1$" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* xAVAX Market Cap */}
          <FormField
            control={form.control}
            name="xAVAXMarketCap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>xAVAX Market Cap($) </FormLabel>
                <FormControl>
                  <Input placeholder="0$" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Number of xAVAX in circulation */}
          <FormField
            control={form.control}
            name="xAVAXinCirculation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of xAVAX in circulation </FormLabel>
                <FormControl>
                  <Input placeholder="0" min={1} {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* xAVAX Price */}
          <FormField
            control={form.control}
            name="xAVAXPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>xAVAX Price($)</FormLabel>
                <FormControl>
                  <Input placeholder="1$" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Leverage */}
          <FormField
            control={form.control}
            name="leverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leverage </FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Collateralization Ratio */}
          <FormField
            control={form.control}
            name="collateralizationRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collateralization Ratio </FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-black dark:bg-white dark:text-black" type="submit">
            Create Report
          </Button>
        </form>
      </Form>
    </section>
  );
}
