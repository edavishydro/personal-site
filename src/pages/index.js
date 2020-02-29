import React from "react";

import Layout from "../components/layout";
import TickTable from "../components/test";
import SEO from "../components/seo";
import BarChart from "../components/barchart";
//import catAndHumanIllustration from "../images/cat-and-human-illustration.svg";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <TickTable />
      <BarChart />
    </Layout>
  );
}

export default IndexPage;
