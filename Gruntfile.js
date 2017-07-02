module.exports = function(grunt) {
  //配置参数
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     concat: {
         options: {
             separator: ';',
             stripBanners: true
         },
         dist: {
             src: [                 
                 "js/jquery.min.js",
                 "js/bootstrap.min.js",
                 "js/bootstrap-table.js",                 
                 "js/bootstrap-table-zh-CN.min.js",
                 "js/bootstrap-table-export.js",
                 "js/vue.min.js",
                 "js/index.js",
                 "js/zzy_*.js"
             ],
             dest: "js/default.js"
         }
     },
     uglify: {
         options: {
         },
         dist: {
             files: {
                 'assets/js/default.min.js': 'js/default.js'
             }
         }
     },
     cssmin: {
         options: {
             keepSpecialComments: 0
         },
         compress: {
             files: {
                 'assets/css/default.css': [
                     "css/bootstrap.min.css",
                     "css/bootstrap-table.css",                     
                     "css/icon.css",
                     "css/index.css",
                     "css/style.css"
                 ]
             }
         }
     },
     watch: {
            files: ['js/*.js', 'css/*.css'],
            tasks: ['concat', 'uglify', 'cssmin']
        }
  });

  //载入concat和uglify插件，分别对于合并和压缩
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //注册任务
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin','watch']);
}