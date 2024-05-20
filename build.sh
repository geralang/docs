#!/bin/bash -e

rm -rf build

cp -r ./src ./build

cd ../test
gerap doc std
cd ../docs
cp -r ../test/.gerap/docs ./build/docs

BUILDER_LIB=$(find 'compiler/libs' -type f | tr '\n' ':')

rm -rf gerac-gh
git clone https://github.com/geralang/gerac gerac-gh
cd gerac-gh
make
cd ..

mkdir compiler/out -p
javac \
    -cp "$BUILDER_LIB" \
    $(find compiler/builder -name "*.java") \
    -d compiler/out/builder
cd "compiler/out/builder"
jar -cef typesafeschwalbe.Builder ../builder.jar *
cd ../../..
javac \
    -cp "$BUILDER_LIB:gerac-gh/gerac.jar" \
    $(find compiler/src -name "*.java") \
    -d compiler/out/compiler
cd "compiler/out/compiler"
jar -cf ../compiler.jar *
cd ../../..

java -cp "compiler/out/builder.jar:$BUILDER_LIB" typesafeschwalbe.Builder \
    gerac-gh/gerac.jar compiler/out/compiler.jar \
    typesafeschwalbe.gerac.web.WebCompiler \
    build/playground/gerac-impl.js

rm -rf gerac-gh