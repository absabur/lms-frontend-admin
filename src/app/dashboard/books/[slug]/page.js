import BookDetails from "@/components/BookDetails";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/get-book/${slug}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();
  return {
    title: "LMS | " + result.data[0].bookName,
  };
}

const page = () => {
  return <BookDetails />;
};

export default page;
