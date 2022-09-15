import replace from "gulp-replace";
import plumber from "gulp-plumber";
import browsersync from "browser-sync";
import notify from "gulp-notify";
import newer from 'gulp-newer';
import ifPlugin from "gulp-if";
import sourcemaps from "gulp-sourcemaps";

export const plugins = {
  replace,
  plumber,
  browsersync,
  notify,
  newer,
  if: ifPlugin,
  sourcemaps
}