const localtunnel = require('localtunnel');
var exec = require('child_process').exec;

(async () => {
  const tunnel = await localtunnel({ port: 80 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  console.log(tunnel.url);

  console.log("passo1");
  exec('rm redirectToLocal/redirect.js');

  console.log("passo2");
  exec('echo "var redirectUrl = \''+ tunnel.url +'\' >> redirectToLocal/redirect.js');

  console.log("passo3");
  exec('cd redirectToLocal && git add --all && git commit -m "'+(new Date().valueOf())+'"  && git push origin master')

  console.log("fim");

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();