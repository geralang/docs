#!/bin/bash -e

rm -rf build

cp -r ./src ./build

cd ../test
gerap doc std
cd ../docs
cp -r ../test/.gerap/docs ./build/docs