
package typesafeschwalbe;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;

import org.teavm.tooling.*;
import org.teavm.tooling.sources.*;
import org.teavm.vm.TeaVMOptimizationLevel;

public class Builder {
    
    public static void main(String[] args) 
        throws TeaVMToolException, MalformedURLException {
        if(args.length < 3) {
            System.out.println("Usage: <input...> <main> <output>");
            return;
        }
        int inputC = args.length - 2;
        final TeaVMTool vm = new TeaVMTool();
        vm.setTargetType(TeaVMTargetType.JAVASCRIPT);
        final File out = new File(args[args.length - 1]);
        vm.setTargetDirectory(out.getParentFile());
        vm.setTargetFileName(out.getName());
        vm.setObfuscated(false);
        final String main = args[args.length - 2];
        vm.setMainClass(main);
        vm.setOptimizationLevel(TeaVMOptimizationLevel.FULL);
        final URL[] urls = new URL[inputC + 1];
        for(int fileI = 0; fileI < inputC; fileI += 1) {
            final File input = new File(args[fileI]);
            vm.addSourceFileProvider(new JarSourceFileProvider(input));
            urls[fileI] = input.toURI().toURL();
        }
        urls[inputC] = new File("./compiler/libs/teavm-classlib-0.7.0.jar").toURI().toURL();
        vm.setClassLoader(
            new URLClassLoader(urls, Builder.class.getClassLoader())
        );
        vm.generate();
        TeaVMProblemRenderer.describeProblems(
            vm.getDependencyInfo().getCallGraph(),
            vm.getProblemProvider(),
            new BuilderLog()
        );
    }

    private static class BuilderLog implements TeaVMToolLog {
        @Override
        public void info(String s) {
            System.out.println("info: (!) " + s);
        }

        @Override 
        public void debug(String s) {
            System.out.println("debug: {!} " + s);
        }

        @Override 
        public void warning(String s) {
            System.out.println("warning: <?> " + s);
        }

        @Override 
        public void error(String s) {
            System.err.println("ERROR: <!> " + s);
        }

        @Override 
        public void info(String s, Throwable t) {
            info(s);
            t.printStackTrace();
        }

        @Override 
        public void debug(String s, Throwable t) {
            debug(s);
            t.printStackTrace();
        }

        @Override 
        public void warning(String s, Throwable t) {
            warning(s);
            t.printStackTrace();
        }

        @Override 
        public void error(String s, Throwable t) {
            error(s);
            t.printStackTrace();
        }
    }

}
