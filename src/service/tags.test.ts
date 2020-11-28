import { concat, from, of } from "rxjs";
import { toArray } from "rxjs/operators";
import { collectTags } from "./tags";

describe("collectLabels", () => {
  it("should concat all distinct tags", async () => {
    const main = of({ tags: ["GO"] });
    const rest = from([
      { tags: ["JAVA"] },
      { tags: ["PYTHON"] },
      { tags: ["JAVA"] },
    ]);
    const tags = await concat(main, rest)
      .pipe(collectTags)
      .pipe(toArray())
      .toPromise();
    expect(tags).toEqual(["GO", "JAVA", "PYTHON"]);
  });
});

describe("collectCollectedLabels", () => {
  it("should concat all distinct tags", async () => {
    const main = of({ collectedTags: ["GO"] });
    const rest = from([
      { collectedTags: ["JAVA"] },
      { collectedTags: ["PYTHON"] },
      { collectedTags: ["JAVA"] },
    ]);
    const tags = await concat(main, rest)
      .pipe(collectTags, toArray())
      .toPromise();
    expect(tags).toEqual(["GO", "JAVA", "PYTHON"]);
  });
});
