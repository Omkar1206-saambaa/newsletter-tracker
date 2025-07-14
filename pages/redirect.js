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

        {/* GA4 Tracking */}
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
                page_path: '/${vertical}/${campaign}/${syndicator}'
              });

              setTimeout(() => {
                window.location.href = "${target}";
              }, 200); // delay for GA4 tracking
            `,
          }}
        />

        {/* Spinner styles */}
        <style>{`
          body {
            margin: 0;
            height: 100vh;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .spinner {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #333;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.7s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>
        <div className="spinner"></div>
      </body>
    </html>
  );
}

