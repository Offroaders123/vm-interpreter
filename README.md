# vm-interpreter

Haven't coded in a while. Feeling interested in things like stack/heap, VMs, execution environments (ie whether that's the VM, bytecode, or OS operations).

The eventual goal is building my own language. I think I just don't quite have the bridge of context of what is what, and how you connect the dots on certain things. Like, I know about assembly, VMs, parsing, syntax, bytecode, etc. I know how they relate. But I also don't necessarily get the whole PUSH, POP, ADD, kind of thing. I mean, I get what it does, but I haven't quite gotten to understanding how it relates to things. I understand memory layouts, endianness, but I don't see how that relates to things like PUSH, POP, I mean in terms of how those are interconnected. I get how they use each other, I just don't see where the lines of division are per se, like say like knowing where to start, I guess.

So yes, this is in TS, merely just because that omits needing to worry about certain things, with low-level implementing of this system. I think after having understood the concept itself, that's when I would attribute it to low-level efficiencies.

### later on...

Hell to the fucking yeah!

Okay, now I get it.

1. So you have source code. It gets read by the lexer. The shape of the syntax is determined there. Then that returns tokens.

2. Tokens are read by the parser. The parser turns tokens into the AST.

3. The compiler reads the AST, and turns the AST into bytecode (in this version of the language thing I made; this is where it might go to assembly, etc).

4. The bytecode is read by the VM (and or the machine, etc), which runs the program. This is where the stack and the heap are. This is the part that actually runs the program, or rather, the surface that the program behaves on. This could be a VM, OS, bare metal, etc.

This is intriguing to me, because much like how syntax works, file parsing makes a lot more sense now as well. The degrees of separation of the stack, as to where things go, like parsing, binary operations, etc, those are now more clear as well. Say like for SNBT and NBT, this has helped the mental model for those as well. Same with where the dynamic versus strongly-type objects and enums for NBT would be placed.
