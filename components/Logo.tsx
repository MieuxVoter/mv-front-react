import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { getUrl, RouteTypes } from '@services/routes';
import logoWithText from '../public/logos/logo.svg';
import logo from '../public/logos/logo-footer.svg';
import { useRouter } from 'next/router';

interface LogoProps {
  title?: boolean;
  [props: string]: any;
}

const Logo = ({ title = true, ...props }: LogoProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const src = title ? logoWithText : logo;
  return (
    <a href={getUrl(RouteTypes.HOME, router).toString()}>
      <Image src={src} alt={t('logo.alt')} className="d-block" {...props} />
    </a>
  );
};

export default Logo;
