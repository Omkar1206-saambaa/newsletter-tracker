export async function getServerSideProps(context) {
  const { vertical = "", campaign = "", syndicator = "", target } = context.query;

  // Use hardcoded SendStak link if no `target` param is present
  const decodedTarget = decodeURIComponent(
    target || "https://sendstak.com/redirect/vppthsjYl-?user={{ contact.EMAIL }}"
  );

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
          src="https://www.googletagmanager.com/gtag/js?id=G-0SLX5YWDZD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0SLX5YWDZD', {
                page_path: '/${vertical}/${campaign}/${syndicator}',
              });
            `,
          }}
        />

        {/* Meta Redirect */}
        <meta httpEquiv="refresh" content={`0; URL='${target}'`} />
      </head>
      <body>
        <p>Redirecting to {target}</p>
      </body>
    </html>
  );
}
