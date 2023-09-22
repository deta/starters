APP_DIR=solid
OUT_DIR=out

mkdir -p $OUT_DIR
rm -rf $OUT_DIR/*

cd $APP_DIR
npm run build
cp -r dist/public/* ../$OUT_DIR
