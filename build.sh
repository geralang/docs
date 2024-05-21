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