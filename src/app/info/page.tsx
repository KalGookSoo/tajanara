'use client';

import { 
  InformationCircleIcon, 
  BuildingOfficeIcon, 
  UserIcon, 
  EnvelopeIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

export default function InfoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">정보</h1>

      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <InformationCircleIcon className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">버전</h2>
            <p>1.0.0</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <BuildingOfficeIcon className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">회사</h2>
            <p>NXCOA</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <UserIcon className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">이름</h2>
            <p>dorffdoyevskyi</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <EnvelopeIcon className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">이메일</h2>
            <p>foo@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <DocumentTextIcon className="w-6 h-6" />
          <div>
            <h2 className="font-semibold">카피라이트</h2>
            <p>© 2025 타자나라. 모든 권리 보유.</p>
            <p className="text-sm text-gray-500 mt-1">이 애플리케이션은 교육 및 연습 목적으로 제작되었습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
