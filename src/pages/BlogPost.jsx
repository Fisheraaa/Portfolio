import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const md = `# 做回测时踩过的第一个坑：look-ahead bias\n\n以为策略有 alpha，结果发现用了未来数据...`;

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div>
      <Helmet><title>{slug} | Blog</title></Helmet>
      <article className="container" style={{ maxWidth: 680, padding: '56px 0', lineHeight: 1.9 }}>
        <ReactMarkdown>{md}</ReactMarkdown>
      </article>
    </div>
  );
}
