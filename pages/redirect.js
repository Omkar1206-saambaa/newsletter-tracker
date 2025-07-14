export async function getServerSideProps(context) {
  const {
    vertical = "",
    campaign = "",
    syndicator = "",
    target,
    link = "1", // Default to link 1
  } = context.query;

  // Define multiple hardcoded SendStak links
  const links = {
    "1": "https://sendstak.com/redirect/f3orYU_ef3?user={{ email }}",
    "2": "https://sendstak.com/redirect/G1RBabYWio?user={{ email }}",
  };

  const fallbackTarget = links[link] || links["1"];

  const decodedTarget = decodeURIComponent(target || fallbackTarget);

  return {
    props: {
      vertical,
      campaign,
      syndicator,
      target: decodedTarget,
    },
  };
}

export default function Redirect({ vertical, campaign, syndicator, target }) {
  return (
    <html>
      <head>
        <title>Redirecting...</title>

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KMQF3VH25V"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KMQF3VH25V', {
                page_path: '/${vertical}/${campaign}/${syndicator}',
              });
            `,
          }}
        />

        <meta httpEquiv="refresh" content={`0; URL='${target}'`} />
      </head>
      <body>
        <p>Redirecting to {target}</p>
      </body>
    </html>
  );
}
