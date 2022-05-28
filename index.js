const localtunnel = require('localtunnel');
var exec = require('child_process').exec;

(async () => {
  const tunnel = await localtunnel({ port: 80 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;

  exec('rm redirectToLocal/redirect.js');

  exec('echo "var redirectUrl = \''+ tunnel.url +'\' >> redirectToLocal/redirect.js');

  exec('cd redirectToLocal && git add --all && git commit -m "'+(new Date().valueOf())+'"  && git push origin master')

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();