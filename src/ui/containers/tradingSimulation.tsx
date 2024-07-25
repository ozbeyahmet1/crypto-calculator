'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Options } from 'react-to-pdf';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { z } from 'zod';

import { useTradingStore } from '../../store';
import { Button } from '../components/lib/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/lib/form';
import { Input } from '../components/lib/input';

const FormSchema = z.object({
  avaxPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0.00001, { message: 'Value must be at least 1' }),
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
      .min(0.00001, { message: 'Value must be at least 1' }),
  ),
  xAVAXinCirculation: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0.00001, { message: 'Value must be at least 1' }),
  ),
  xAVAXPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0.00001, { message: 'Value must be at least 1' }),
  ),
  leverage: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0.00001, { message: 'Value must be at least 1' }),
  ),
  collateralizationRatio: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Avax Price must be a number',
      })
      .min(0.00001, { message: 'Value must be at least 1' }),
  ),
  amountOfAVAXDepositedbytheUser: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Amount of AVAX Deposited by the User must be a number',
      })
      .min(0, {
        message: 'Amount of AVAX Deposited by the User must be at least 1',
      }),
  ),
  xAVAXMinted: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'xAVAX Minted must be a number',
      })
      .min(0, {
        message: 'xAVAX Minted must be at least 1',
      }),
  ),
  valueOfthexAVAXPositionoftheUser: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Value of the xAVAX Position of the User must be a number',
      })
      .min(0, {
        message: 'Value of the xAVAX Position of the User must be at least 1',
      }),
  ),
  changeinAVAXPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Change in AVAX Price must be a number',
      })
      .min(0, {
        message: 'Change in AVAX Price must be at least 1',
      }),
  ),
  newxAVAXPrice: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'New xAVAX Price must be a number',
      })
      .min(0, {
        message: 'New xAVAX Price must be at least 1',
      }),
  ),
  newValueofthexAVAXPositionoftheUser: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'New Value of the xAVAX Position of the User must be a number',
      })
      .min(0, {
        message: 'New Value of the xAVAX Position of the User must be at least 1',
      }),
  ),
  amountOfAVAXUserHave: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Amount of AVAX User Have must be a number',
      })
      .min(0, {
        message: 'Amount of AVAX User Have must be at least 1',
      }),
  ),
  increaseDecreaseinDollarValue: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Increase/Decrease in Dollar Value must be a number',
      })
      .min(0, {
        message: 'Increase/Decrease in Dollar Value must be at least 0',
      }),
  ),
  increaseDecreaseinAvaxValue: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'required field',
        invalid_type_error: 'Increase/Decrease in Avax Value must be a number',
      })
      .min(0, {
        message: 'Increase/Decrease in Avax Value must be at least 0',
      }),
  ),
});

export function TradingSimulation() {
  const finalDatas = useTradingStore((state) => state.data);
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
      amountOfAVAXDepositedbytheUser: 100,
      xAVAXMinted: 2467.722857,
      valueOfthexAVAXPositionoftheUser: 3000,
      changeinAVAXPrice: 10,
      newxAVAXPrice: 1.68,
      newValueofthexAVAXPositionoftheUser: 4157.14,
      amountOfAVAXUserHave: 125.97,
      increaseDecreaseinDollarValue: 38.57,
      increaseDecreaseinAvaxValue: 25.97,
    },
    values: finalDatas,
  });
  const avaxPrice = useWatch({ control: form.control, name: 'avaxPrice' });
  const depositedAvax = useWatch({ control: form.control, name: 'depositedAvax' });
  const collateralizationRatio = useWatch({ control: form.control, name: 'collateralizationRatio' });
  const aUSDinCirculation = useWatch({ control: form.control, name: 'aUSDinCirculation' });
  const totalValOfAvax = useWatch({ control: form.control, name: 'totalValOfAvax' });
  const aUSDmarketCap = useWatch({ control: form.control, name: 'aUSDmarketCap' });
  const xAVAXMarketCap = useWatch({ control: form.control, name: 'xAVAXMarketCap' });
  const xAVAXinCirculation = useWatch({ control: form.control, name: 'xAVAXinCirculation' });
  const amountOfAVAXDepositedbytheUser = useWatch({ control: form.control, name: 'amountOfAVAXDepositedbytheUser' });
  const xAVAXMinted = useWatch({ control: form.control, name: 'xAVAXMinted' });
  const xAvacPrice = useWatch({ control: form.control, name: 'xAVAXPrice' });
  const valueOfthexAVAXPositionoftheUser = useWatch({
    control: form.control,
    name: 'valueOfthexAVAXPositionoftheUser',
  });
  const changeinAVAXPrice = useWatch({ control: form.control, name: 'changeinAVAXPrice' });
  const newxAVAXPrice = useWatch({ control: form.control, name: 'newxAVAXPrice' });
  const newValueofthexAVAXPositionoftheUser = useWatch({
    control: form.control,
    name: 'newValueofthexAVAXPositionoftheUser',
  });
  const amountOfAVAXUserHave = useWatch({ control: form.control, name: 'amountOfAVAXUserHave' });
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

  useEffect(() => {
    const parsedAmountOfAVAXDepositedbytheUser = parseFloat(amountOfAVAXDepositedbytheUser.toString());
    const parsedAvaxPrice = parseFloat(avaxPrice.toString());
    const parsedxAvaxPrice = parseFloat(xAvacPrice.toString());
    form.setValue('xAVAXMinted', (parsedAmountOfAVAXDepositedbytheUser * parsedAvaxPrice) / parsedxAvaxPrice);
  }, [form, amountOfAVAXDepositedbytheUser, avaxPrice, xAvacPrice]);

  useEffect(() => {
    const parsedXavaxMinted = parseFloat(xAVAXMinted.toString());
    const parsedxAvaxPrice = parseFloat(xAvacPrice.toString());
    form.setValue('valueOfthexAVAXPositionoftheUser', parsedXavaxMinted * parsedxAvaxPrice);
  }, [form, xAVAXMinted, xAvacPrice]);

  useEffect(() => {
    const parsedTotalValOfAvax = parseFloat(totalValOfAvax.toString());
    const parsedChangeinAvaxPrice = parseFloat(changeinAVAXPrice.toString());
    const parsedAusdMarketCap = parseFloat(aUSDmarketCap.toString());
    const parsedxAvaxInCirc = parseFloat(xAVAXinCirculation.toString());
    const calculatedNewxAVAXPrice =
      (parsedTotalValOfAvax + parsedTotalValOfAvax * (parsedChangeinAvaxPrice * 0.01) - parsedAusdMarketCap) /
      parsedxAvaxInCirc;

    form.setValue('newxAVAXPrice', calculatedNewxAVAXPrice);
  }, [form, totalValOfAvax, changeinAVAXPrice, aUSDmarketCap, xAVAXinCirculation]);

  useEffect(() => {
    const parsedNewxAVAXPrice = parseFloat(newxAVAXPrice.toString());
    const parsedXavaxMinted = parseFloat(xAVAXMinted.toString());
    const calculcatedNewValueofthexAVAXPositionoftheUser = parsedNewxAVAXPrice * parsedXavaxMinted;
    form.setValue('newValueofthexAVAXPositionoftheUser', calculcatedNewValueofthexAVAXPositionoftheUser);
  }, [form, newxAVAXPrice, xAVAXMinted]);

  useEffect(() => {
    const parsedNewValueofthexAVAXPositionoftheUser = parseFloat(newValueofthexAVAXPositionoftheUser.toString());
    const parsedAvaxPrice = parseFloat(avaxPrice.toString());
    const parsedChangeinAvaxPrice = parseFloat(changeinAVAXPrice.toString());
    const calculatedAmountOfAVAXUserHave =
      parsedNewValueofthexAVAXPositionoftheUser /
      (parsedAvaxPrice + parsedAvaxPrice * (parsedChangeinAvaxPrice * 0.01));

    form.setValue('amountOfAVAXUserHave', calculatedAmountOfAVAXUserHave);
  }, [form, newValueofthexAVAXPositionoftheUser, avaxPrice, changeinAVAXPrice]);

  useEffect(() => {
    const parsedNewValueofthexAVAXPositionoftheUser = parseFloat(newValueofthexAVAXPositionoftheUser.toString());
    const parsedValueOfthexAVAXPositionoftheUser = parseFloat(valueOfthexAVAXPositionoftheUser.toString());
    const increaseDecreaseinDollarValue =
      (parsedNewValueofthexAVAXPositionoftheUser - parsedValueOfthexAVAXPositionoftheUser) /
      parsedValueOfthexAVAXPositionoftheUser;

    form.setValue('increaseDecreaseinDollarValue', increaseDecreaseinDollarValue * 100);
  }, [form, newValueofthexAVAXPositionoftheUser, valueOfthexAVAXPositionoftheUser]);

  useEffect(() => {
    const parsedAmountofAVAXUserHave = parseFloat(amountOfAVAXUserHave.toString());
    const parsedAmountofAVAXDepositedbytheUser = parseFloat(amountOfAVAXDepositedbytheUser.toString());
    const increaseDecreaseinAvaxValue =
      (parsedAmountofAVAXUserHave - parsedAmountofAVAXDepositedbytheUser) / parsedAmountofAVAXDepositedbytheUser;

    form.setValue('increaseDecreaseinAvaxValue', increaseDecreaseinAvaxValue * 100);
  }, [form, amountOfAVAXUserHave, amountOfAVAXDepositedbytheUser]);

  const setData = useTradingStore((state) => state.assign);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setData(data);
  }

  const [showPdf, setShowPdf] = useState(false);
  const options: Options = {
    filename: 'trading-simulation.pdf',
    // default is `save`
    method: 'save',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'A4',
      // default is 'portrait'
      orientation: 'portrait',
    },
  };
  const openPDF = async () => {
    setShowPdf(true);
    try {
      await generatePDF(() => document.getElementById('wrapper'), options);
    } catch (error) {
      console.error('PDF Creation Error', error);
    } finally {
      setShowPdf(false);
    }
  };
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
                  <Input placeholder="Avax Price" {...field} type="number" />
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
          {/* Amount of AVAX Deposited by the User */}
          <FormField
            control={form.control}
            name="amountOfAVAXDepositedbytheUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount of AVAX Deposited by the User</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* xAVAX Minted */}
          <FormField
            control={form.control}
            name="xAVAXMinted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>xAVAX Minted</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Value of the xAVAX Position of the User */}
          <FormField
            control={form.control}
            name="valueOfthexAVAXPositionoftheUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value of the xAVAX Position of the User</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Change in AVAX Price */}
          <FormField
            control={form.control}
            name="changeinAVAXPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Change in AVAX Price</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New xAVAX Price */}
          <FormField
            control={form.control}
            name="newxAVAXPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel> New xAVAX Price</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New Value of the xAVAX Position of the User */}
          <FormField
            control={form.control}
            name="newValueofthexAVAXPositionoftheUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel> New Value of the xAVAX Position of the User</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Amount of AVAX User Have */}
          <FormField
            control={form.control}
            name="amountOfAVAXUserHave"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Amount of AVAX User Have</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Increase/Decrease in Dollar Value */}
          <FormField
            control={form.control}
            name="increaseDecreaseinDollarValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Increase/Decrease in Dollar Value</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="increaseDecreaseinAvaxValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Increase/Decrease in Avax Value</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} type="number" disabled className="bg-gray-200 dark:bg-gray-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button className="bg-black dark:bg-white dark:text-black" type="submit">
              Save Calculations
            </Button>
            {!showPdf && (
              <Button onClick={() => setShowPdf(true)} id="pdfclick" className="bg-black dark:bg-white dark:text-black">
                Create PDF
              </Button>
            )}
            {showPdf && (
              <Button onClick={openPDF} id="pdfclick" className="bg-black dark:bg-white dark:text-black">
                Download
              </Button>
            )}
          </div>
          {showPdf && (
            <div id="wrapper" className="bg-white px-2 py-3 text-black lg:px-10 lg:py-12">
              <div className="flex w-full items-center">
                <h2 className="mb-5 text-3xl font-bold">Trading Simulation</h2>
              </div>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Field</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Amount of AVAX Deposited by the User</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('amountOfAVAXDepositedbytheUser')}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>xAVAX Minted</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('xAVAXMinted')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      Value of the xAVAX Position of the User
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('valueOfthexAVAXPositionoftheUser')}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Change in AVAX Price</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('changeinAVAXPrice')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>New xAVAX Price</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('newxAVAXPrice')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      New Value of the xAVAX Position of the User
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('newValueofthexAVAXPositionoftheUser')}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Amount of AVAX User Have</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('amountOfAVAXUserHave')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Increase/Decrease in Dollar Value</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('increaseDecreaseinDollarValue')}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Increase/Decrease in AVAX Value</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('increaseDecreaseinAvaxValue')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </form>
      </Form>
    </section>
  );
}
