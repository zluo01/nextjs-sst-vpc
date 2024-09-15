/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nextjs-sst-vpc",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");

    new sst.aws.Nextjs("MyWeb", {
      vpc: {
        securityGroups: vpc.securityGroups,
        privateSubnets: vpc.privateSubnets,
      },
    });
  },
});
