const Generator = require('yeoman-generator');
const ncp = require('ncp');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
    this.name = this.options.appname || 'myapp';
    this.description = 'My cool app';
    this.version = '1.0.0';
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'description',
        message: `App description [${this.description}]`,
      },
      {
        type: 'input',
        name: 'version',
        message: `App version [${this.version}]`,
      },
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: 'input',
        name: 'name',
        message: `App name [${this.name}]`,
      });
    }

    return this.prompt(prompts).then(r => {
      this.name = r.name ? r.name : this.name;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
    });
  }

  writing() {
    const done = this.async();

    const src = this.sourceRoot();
    const dest = this.destinationPath(this.name);
    console.log(src);
    console.log(dest);

    ncp(src, dest, function(err) {
      if (err) {
        console.error(err);
      }
      done();
    });
  }

  install() {
    const appDir = path.join(process.cwd(), this.name);
    process.chdir(appDir);
    this.npmInstall();
  }
};
