const localtunnel = require('localtunnel');
var exec = require('child_process').exec;

(async () => {
  const tunnel = await localtunnel({ port: 80, local_host: "drupal9.docksal" });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  tunnel.url;
  console.log(tunnel.url);

  console.log("passo1");
  exec('rm redirectToLocal/redirect.js');

  console.log('echo "var redirectUrl = \''+ tunnel.url +'\'" >> redirectToLocal/redirect.js');
  exec('echo "var redirectUrl = \''+ tunnel.url +'\'" >> redirectToLocal/redirect.js');

  console.log('cd redirectToLocal && git add --all && git commit -m "'+(new Date().valueOf())+'"  && git push origin master');
  coffeeProcess = exec('cd redirectToLocal && git add --all && git commit -m "'+(new Date().valueOf())+'"  && git push origin master')

  coffeeProcess.stdout.on('data', function(data) {
    console.log(data); 
  });

  console.log("fim");

  tunnel.on('close', () => {
    // tunnels are closed
  });
})();