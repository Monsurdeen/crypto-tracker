import {
  formatPrice,
  formatMarketCap,
  formatPercent,
} from "../utils/formatters";
import SparklineChart from "./SparklineChart";

function CoinRow({ coin, index, onClick }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <tr
     className="coin-row"
  onClick={() => onClick(coin)}
  style={{ borderBottom: '1px solid var(--border-color)' }}
      
    >
      <td style={{ padding: "14px 16px", color: "#6B7280" }}>{index + 1}</td>
      <td style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={coin.image} alt={coin.name} width={28} height={28} />
          <div>
            <div style={{ fontWeight: "600" }}>{coin.name}</div>
            <div
              style={{
                fontSize: "12px",
                color: "#6B7280",
                textTransform: "uppercase",
              }}
            >
              {coin.symbol}
            </div>
          </div>
        </div>
      </td>
      <td style={{ padding: "14px 16px", fontWeight: "600" }}>
        {formatPrice(coin.current_price)}
      </td>
      <td
        style={{
          padding: "14px 16px",
          color: isPositive ? "#16A34A" : "#DC2626",
          fontWeight: "600",
        }}
      >
        {formatPercent(coin.price_change_percentage_24h)}
      </td>
      <td style={{ padding: "14px 16px", color: "#374151" }}>
        {formatMarketCap(coin.market_cap)}
      </td>
      <td style={{ padding: "14px 16px" }}>
        <SparklineChart
          data={coin.sparkline_in_7d?.price}
          isPositive={isPositive}
        />
      </td>
    </tr>
  );
}

export default CoinRow;
