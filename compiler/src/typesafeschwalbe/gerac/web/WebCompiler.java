
package typesafeschwalbe.gerac.web;

import java.util.HashMap;

import de.mirkosertic.bytecoder.api.Export;

import typesafeschwalbe.gerac.compiler.Compiler;
import typesafeschwalbe.gerac.compiler.Error;
import typesafeschwalbe.gerac.compiler.Result;
import typesafeschwalbe.gerac.compiler.Target;

public class WebCompiler {

    @Export("gerawebc_compile")
    public static String compile(
        String[] fileNames, String[] fileContents, String mainPath
    ) {
        final HashMap<String, String> files = new HashMap<>();
        for(int fi = 0; fi < fileNames.length; fi += 1) {
            files.put(fileNames[fi], fileContents[fi]);
        }
        Result<Compiler.Output> r = Compiler.compile(files, Target.JAVASCRIPT, mainPath, false);
        if(r.isValue()) {
            return "S" + r.getValue().code();
        }
        StringBuilder eo = new StringBuilder();
        for(Error e: r.getError()) {
            eo.append(e.render(files, true));
        }
        return "E" + eo;
    }

    public static void main(String[] args) {}

}
