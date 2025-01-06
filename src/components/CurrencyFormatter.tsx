interface CurrencyFormatterProps {
    amount: number;
    locale?: string;
    currency?: string;
  }
  
  const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
    amount,
    locale = "en-US",
    currency = "USD",
  }) => {
    const formattedAmount = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  
    return <span>{formattedAmount}</span>;
  };

  export default CurrencyFormatter;