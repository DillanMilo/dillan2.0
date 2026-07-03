# Money Line — Trend-Flip Indicator (Personal Rebuild)

A TradingView / Pine Script v6 indicator that replicates the *behavior* of Ivan on Tech's
"Money Line" (BullMania): a single thick line that trails price, holds one of two states —
**green = bullish trend, red = bearish trend** — and **flips** when price closes through it.
Get in when it flips green, ride the wave, step aside when it flips red.

> **Personal use only.** Ivan's actual script is closed-source (invite-only on TradingView).
> This is an independent functional equivalent built from the product's publicly documented
> behavior — not his code. Don't publish or resell it.

---

## Adding it to TradingView

1. Open any chart on TradingView → click **Pine Editor** (bottom toolbar).
2. Delete whatever is in the editor and paste the full contents of `money-line.pine`.
3. Click **Save** (name it "Money Line"), then **Add to chart**.
4. It will now appear under **Indicators → My scripts** on every chart/timeframe.

## Setting up alerts (mirrors the real Money Line's flow)

1. On the chart, click **⏰ Alert** (or press `Alt+A`).
2. **Condition** → select **MoneyLine**.
3. Pick the trigger — the condition names match the real product:
   - **Downtrend to Uptrend** → fires when the line flips green (bull flip)
   - **Uptrend to Downtrend** → fires when the line flips red (bear flip)
   - **Any Trend Flip** → fires on either
4. Set trigger to **Once Per Bar Close** — this is important. Intrabar, price can poke
   through the line and pull back; only a *close* through the line is a confirmed flip.
5. Set expiration / notification method and save. Repeat per timeframe you want to watch.

One alert per symbol **per timeframe** (an alert created on the 4H chart fires on 4H flips).

## How it works

The engine is a **ratcheting ATR trailing stop** (Supertrend family) — the public
construction that best matches the Money Line's documented behavior:

- In a **bull state** the line sits `sensitivity × ATR` below price and can only **rise or
  hold**, never fall. It acts as trailing support.
- In a **bear state** the line sits above price and can only **fall or hold**. Trailing
  resistance.
- When price **closes through** the line, the state flips, the line jumps to the other side
  of price, and the color changes. That close is the BUY/SELL signal.

Because the offset is measured in ATRs (volatility-adaptive), the same settings work on
every symbol and every timeframe without re-tuning.

## Timeframes (W / D / 4H / 1H / 30m)

The indicator computes identically on all timeframes — what changes is signal quality:

| Timeframe | Flip frequency | Character |
|---|---|---|
| **W** | A handful per year | Slow but very high conviction — macro bull/bear regime |
| **D** | ~1–3 per month | The workhorse swing-trading signal |
| **4H** | Several per week | Good entry timing inside a daily trend |
| **1H** | Daily-ish | Noisier; best only traded *with* the higher-TF trend |
| **30m** | Multiple per day | Noisiest; timing tool only |

"Higher timeframe = more accurate" isn't marketing magic — more smoothing means fewer
whipsaws. The classic workflow: **W/D define the bias, 4H/1H/30m time the entry in that
direction.** The built-in dashboard (top-right table) shows all five states at once so you
can check alignment without switching charts.

## Settings that matter

| Input | Default | Effect |
|---|---|---|
| **Trend Length (ATR periods)** | 10 | Higher = smoother, fewer flips |
| **Sensitivity (ATR multiplier)** | 3.0 | **The main dial.** Higher (3.5–4) = fewer, later, higher-conviction flips. Lower (2–2.5) = earlier flips, more whipsaw |
| **Source** | hl2 | `close` makes it slightly more reactive |
| **Line smoothing** | 1 (off) | Cosmetic only — set 3–5 if you want a softer, curvier line. Signals always use the raw engine |
| **Dashboard timeframes** | W, D, 240, 60, 30 | The five-timeframe trend table |

**Matching it to Ivan's line:** put both on the same chart (if you ever have access, or
compare against his screenshots/videos) and adjust *Sensitivity* until the flip points line
up. If his flips come earlier, lower it; later, raise it. Length 10 / multiplier 3.0 is the
classic starting point and produces "a handful of trades per year" on the weekly — matching
BullMania's own description.

## Research basis (what's confirmed vs. inferred)

**Confirmed from public sources** (BullMania site/help center, Ivan's posts):
- Branded a *"Trend Following Indicator"* — "shows you if an asset is in a bullish trend or
  a bearish trend"; green = buy, red = sell.
- Binary state with flip alerts literally named *"Downtrend to Uptrend"* / *"Uptrend to
  Downtrend"*, recommended trigger *"Once Per Bar Close"* — replicated verbatim here.
- Works on all timeframes; weekly described as "a handful of trades per year" capturing the
  biggest moves.
- Lineage: descends from Ivan's earlier "Moralis Line" / BSI "Short-Term Trend" component;
  the modern version works on any asset, implying pure price/volatility math (no on-chain
  data).

**Inferred (the proprietary part):** the exact formula is not public. The ratcheting ATR
trailing stop is the standard public construction that reproduces every documented behavior:
two-state line, decisive bar-close flips, all-timeframe operation, low flip frequency on
high timeframes.
