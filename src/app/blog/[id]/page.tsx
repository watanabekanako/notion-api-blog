import { getPageContent, getPageInfo } from "../../../../lib/notion/notion";
import ReactMarkdown from "react-markdown";

export default async function Page({ params }: { params: { id: string } }) {
  const pageContents: any = await getPageContent(params.id);
  const pageInfo = await getPageInfo(params.id);

  return (
    <>
      <div className="container mx-auto p-20 md:w-4/5 lg:w-3/5">
        <div className="">{/* <BackButton /> */}</div>
        <div className="text-center px-5 lg:px-20">
          <p>{pageInfo.title}</p>
        </div>
        <div className="text-right px-5 lg:px-20 text-gray-500">
          <p>{pageInfo.date}</p>
        </div>
        <div className="text-right px-5 lg:px-20 text-gray-500">
          <p>{pageInfo.author}</p>
        </div>
        <div className="py-10 px-5  lg:p-10 lg:px-20">
          {pageContents.map((content: any, index: any) => {
            const formattedMarkdown = content.parent.replace(/\n/g, "  \n");
            return (
              <div className="pt-3 list-decimal" key={index}>
                <ReactMarkdown
                  components={{
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside pb-2"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => <li {...props} />,
                  }}
                >
                  {formattedMarkdown}
                </ReactMarkdown>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
