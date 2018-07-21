const fs = require('fs')
const gitignoreSnippet = `
# Vue Browser Extension Output
*.pem
*.pub
*.zip
/dist-zip
`

module.exports = (api, { config, optionsPage }) => {
  const eslintConfig = { env: { webextensions: true } }
  const pkg = {
    private: true,
    scripts: {
      'serve': 'vue-cli-service build --mode development --watch'
    },
    dependencies: {
      'vue-router': '^3.0.1',
      'vuex': '^3.0.1'
    }
  }

  if (api.hasPlugin('eslint')) {
    console.log('Adding eslint config stuffs')
    pkg.eslintConfig = eslintConfig
  }

  api.extendPackage(pkg)
  api.render('./template/src/manifest.json')
  api.render('./template/src/background.js')
  api.render('./template/src/popup')
  api.render('./template/src/store')

  if (optionsPage) {
    api.render('./template/src/options')
  }

  api.onCreateComplete(() => {
    const gitignore = fs.readFileSync(api.resolve('./.gitignore'), 'utf8')
    fs.writeFileSync(api.resolve('./.gitignore'), gitignore + gitignoreSnippet)
  })
}
