"use client";

import CodeBlock, { CodeLine } from "@/components/code-block";
import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 imperative ETL · 1 dbt model · 2 punchline
export const PIPELINES_STEPS = 3;

const ETL: CodeLine[] = [
  { text: "# etl_orders.py — runs nightly, pray" },
  { text: "conn = psycopg2.connect(DSN)" },
  { text: "cur = conn.cursor()" },
  { text: 'cur.execute("DROP TABLE IF EXISTS orders_daily")' },
  { text: 'cur.execute("CREATE TABLE orders_daily (…)")' },
  { text: 'for chunk in read_csv("orders.csv", chunksize=50_000):' },
  { text: "    rows = clean(chunk)   # dedupe, cast, fix tz" },
  { text: "    execute_values(cur, INSERT_SQL, rows)" },
  { text: "conn.commit()             # hope nothing died at 3am" },
];

const DBT: CodeLine[] = [
  { text: "-- models/orders_daily.sql" },
  { text: "{{ config(materialized='table') }}" },
  { text: "" },
  { text: "select order_date::date as day," },
  { text: "       count(*)          as orders," },
  { text: "       sum(amount)       as revenue" },
  { text: "from {{ ref('stg_orders') }}" },
  { text: "group by 1" },
];

export function PipelinesSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="the same shift, upstream"
      title="Data engineering made this trade first"
    >
      <div className="grid grid-cols-2 gap-[3vw]">
        <Reveal show={step >= 0}>
          <div className="mono mb-2 text-sm uppercase tracking-widest text-[var(--imp)]">
            imperative pipeline
          </div>
          <CodeBlock lines={ETL} accent="var(--imp)" label="2015: the how" />
          <p className="mt-3 text-[clamp(0.8rem,1.4vw,1rem)] italic text-[var(--muted)]">
            Ordering, DDL, retries, idempotency — all on you.
          </p>
        </Reveal>
        <Reveal show={step >= 1}>
          <div className="mono mb-2 text-sm uppercase tracking-widest text-[var(--dec)]">
            declarative model (dbt)
          </div>
          <CodeBlock lines={DBT} accent="var(--dec)" label="2020: the what" />
          <p className="mt-3 text-[clamp(0.8rem,1.4vw,1rem)] italic text-[var(--muted)]">
            Declare the table you want. dbt derives the DAG, the DDL, the run
            order, even the docs.
          </p>
        </Reveal>
      </div>
      <Punchline show={step >= 2}>
        “Analytics engineering” is what we named the moment pipelines went
        declarative.
      </Punchline>
    </SlideShell>
  );
}
