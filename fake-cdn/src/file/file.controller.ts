import { createReadStream } from "node:fs";
import { join } from "node:path";
import { Controller, Get, Req, Request, StreamableFile } from "@nestjs/common";

@Controller("file")
export class FileController {
    @Get()
    getFile(@Req() request): StreamableFile {
        console.log(request.cookies);

        const file = createReadStream(join(process.cwd(), "static/teste.css"));
        return new StreamableFile(file, {
            type: "text/css",
            disposition: 'attachment; filename="teste.css"',
        });
    }
}
