'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Options } from 'react-to-pdf';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import { z } from 'zod';

import { useStore } from '../../store';
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
const montserrat = Montserrat({ subsets: ['latin'] });
export function ProtocolSimulation() {
  const finalDatas = useStore((state) => state.data);
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
  const setData = useStore((state) => state.assign);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setData(data);
  }
  const [showPdf, setShowPdf] = useState(false);
  const options: Options = {
    filename: 'protocol-simulation.pdf',
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
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
    },
    canvas: {
      mimeType: 'image/png',
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };
  const openPDF = async () => {
    setShowPdf(true);
    try {
      await generatePDF(() => document.getElementById('wrapper'), options);
    } catch (error) {
      console.error('PDF oluşturma sırasında bir hata oluştu:', error);
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
            <div id="wrapper" className="bg-white px-10 py-12 text-black">
              <div>
                <div className="mb-6 mr-10">
                  <p
                    className={`overflow-hidden text-xl font-semibold leading-[0.95] text-red-700 ${montserrat.className}`}>
                    Stable
                  </p>
                  <p
                    className={`overflow-hidden text-xl font-semibold leading-[0.95] text-red-700 ${montserrat.className}`}>
                    Jack
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center">
                <h2 className="mb-5 text-3xl font-bold">Protocol Simulation</h2>
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
                    <td style={{ border: '1px solid black', padding: '8px' }}>Avax Price($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('avaxPrice')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      Amount of AVAX Deposited into the Protocol
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('depositedAvax')} AVAX</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      Total Value of AVAX Collateral of the Protocol($)
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('totalValOfAvax')} $</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>aUSD Market Cap($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('aUSDmarketCap')} $</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Amount of aUSD in circulation($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('aUSDinCirculation')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>aUSD Price($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('aUSDPrice')} $</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>xAVAX Market Cap($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('xAVAXMarketCap')} $</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Number of xAVAX in circulation</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('xAVAXinCirculation')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>xAVAX Price($)</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('xAVAXPrice')} $</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Leverage</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{form.watch('leverage')}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Collateralization Ratio</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      {form.watch('collateralizationRatio')}
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
