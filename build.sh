#!/bin/bash -e

rm -rf build

# Prepare build directory

cp -r ./src ./build
mkdir -p build-temp

# Generate stdlib documentation
if [ ! -d "build-temp/gerap_doc_proj" ]; then
    cd "build-temp"
    gerap new "gerap_doc_proj"
    cd ..
fi
cd "build-temp/gerap_doc_proj"
gerap doc std
cd ../..
cp -r "build-temp/gerap_doc_proj/.gerap/docs" "./build/docs"

# Compile gerac to Javascript

BUILDER_LIB=$(find 'compiler/libs' -type f | tr '\n' ':')

# # if '../gerac/gerac.jar' is present:
# mkdir gerac-gh -p
# cp ../gerac/gerac.jar gerac-gh/gerac.jar
# # else:
rm -rf gerac-gh
git clone https://github.com/geralang/gerac gerac-gh
cd gerac-gh
make
cd ..

mkdir build-temp/out -p
javac \
    -cp "$BUILDER_LIB" \
    $(find compiler/builder -name "*.java") \
    -d build-temp/out/builder
cd "build-temp/out/builder"
jar -cef typesafeschwalbe.Builder ../builder.jar *
cd ../../..
javac \
    -cp "$BUILDER_LIB:gerac-gh/gerac.jar" \
    $(find compiler/src -name "*.java") \
    -d build-temp/out/compiler
cd "build-temp/out/compiler"
jar -cf ../compiler.jar *
cd ../../..

java -cp "build-temp/out/builder.jar:$BUILDER_LIB" typesafeschwalbe.Builder \
    gerac-gh/gerac.jar build-temp/out/compiler.jar \
    typesafeschwalbe.gerac.web.WebCompiler \
    build/playground/gerac-impl.js

rm -rf gerac-gh

rm -rf std-gh
git clone https://github.com/geralang/std std-gh
cp -r std-gh/src ./build/playground/std-gera/
cp -r std-gh/src-js ./build/playground/std-js/
cd build/playground
find std-gera -type f \( -iname \*.gera -o -iname \*.gem \) > std-sources-gera.txt
find std-js -name "*.js" > std-sources-js.txt
cd ../..
rm -rf std-gh