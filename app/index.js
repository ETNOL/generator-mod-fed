var generators = require('yeoman-generator');

var CshtmlFilePath = 'Views/PatternLibrary/Components/Assets/';
var LessFilePath = 'Content/Styles/Components/';
var ScssFilePath = 'Content/Styles/Components/';


module.exports = generators.Base.extend({

  prompting: function () {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'Module name(ie. Typography):',
      validate: function (input) {
        return input != "";
      }
     }, {
      type: 'checkbox',
      name: 'files',
      message: 'Which files would you like to generate?',
      choices: [{
        name: 'cshtml',
        value: 'cshtml',
        checked: true
      }, 
      {
        name: 'scss',
        value: 'scss',
        checked: false 
      },
      {
        name: 'less',
        value: 'less',
        checked: false 
      }]
    }];

    this.prompt(prompts, function (answers) {
      var files = answers.files; 
      this.moduleName = answers.moduleName;

      function includeFile (file) {
        return files && files.indexOf(file) !== -1;
      }

      this.includeCshtml = includeFile('cshtml');
      this.includeScss = includeFile('scss');

      done();
    }.bind(this));
  },

  writing: {

    cshtml: function () {
      if (this.includeCshtml) {
        this.fs.copyTpl( 
          this.templatePath('template.cshtml'),
          this.destinationPath(CshtmlFilePath + this.moduleName + "Module.cshtml"),
          { 
            moduleName: this.moduleName
          }
        );
      }
    },
    scss: function () {
      if (this.includeScss) {
        this.fs.copyTpl( 
          this.templatePath('template.scss'),
          this.destinationPath(ScssFilePath + this.moduleName + ".scss"),
          { 
            moduleName: this.moduleName
          }
        );
      }
    },
    less: function () {
      if (this.includeLess) {
        this.fs.copyTpl( 
          this.templatePath('template.less'),
          this.destinationPath(LessFilePath + this.moduleName + ".less"),
          { 
            moduleName: this.moduleName
          }
        );
      }
    }
  }
});
