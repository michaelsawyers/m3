import { AkHeader } from "../ui/ak-header";
import { AkTextInput } from "../ui/ak-text-input";

export function Scaffold(props: React.ComponentProps<"div">) {
  return (
    <div className="w-full" {...props}>
      <AkHeader className="flex justify-between sticky top-0">
        <h1 className="text-h2 font-secondary">AbbVie</h1>
        <AkTextInput placeholder="Search" className="w-52" />
      </AkHeader>
    </div>
  );
}
